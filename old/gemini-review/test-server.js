#!/usr/bin/env node

/**
 * Simple test script to verify gemini-review MCP server functionality
 * 
 * This doesn't fully test the MCP protocol, but verifies:
 * - gemini-cli is installed
 * - gemini-cli is configured
 * - Basic command execution works
 */

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

console.log("🧪 Testing gemini-review MCP server prerequisites...\n");

async function testGeminiCli() {
  console.log("1. Checking if gemini-cli is installed...");
  try {
    await execAsync("which gemini");
    console.log("   ✅ gemini-cli found\n");
    return true;
  } catch (error) {
    console.log("   ❌ gemini-cli not found");
    console.log("   Install it with: pip install gemini-cli\n");
    return false;
  }
}

async function testGeminiConfig() {
  console.log("2. Testing gemini-cli configuration...");
  let attempts = 3;
  while (attempts > 0) {
    try {
      const { stdout, stderr } = await execAsync("gemini -p 'Say hello' 2>&1", { timeout: 10000 });
      
      const output = stdout + stderr;
      if (output.toLowerCase().includes('not authenticated') || 
          output.toLowerCase().includes('login required') ||
          output.toLowerCase().includes('authentication failed')) {
        console.log("   ❌ gemini-cli not authenticated");
        console.log("   Authenticate with: gemini auth login");
        console.log("   Or configure API key: gemini config set api_key YOUR_KEY\n");
        return false;
      }
      
      console.log("   ✅ gemini-cli is authenticated and working");
      console.log(`   Response preview: ${stdout.substring(0, 50)}...\n`);
      return true;
    } catch (error) {
      attempts--;
      if (attempts > 0) {
        console.log(`   ⚠️  gemini-cli test failed, retrying in 5 seconds... (${attempts} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        console.log("   ❌ gemini-cli configuration issue");
        console.log("   Authenticate with: gemini auth login");
        console.log("   Or configure API key: gemini config set api_key YOUR_KEY");
        console.log(`   Error: ${error.message}\n`);
        return false;
      }
    }
  }
}

async function testFileReference() {
  console.log("3. Testing file reference with @ syntax...");
  
  try {
    // Test with @ syntax using server.js
    const { stdout } = await execAsync(
      "gemini -p 'Briefly describe this code @server.js' 2>&1",
      { timeout: 15000 }
    );
    
    console.log("   ✅ File reference (@) syntax works");
    console.log(`   Response preview: ${stdout.substring(0, 50)}...\n`);
    
    return true;
  } catch (error) {
    console.log("   ⚠️  File reference test had issues");
    console.log(`   Error: ${error.message}\n`);
    
    return false;
  }
}

async function runTests() {
  const cliInstalled = await testGeminiCli();
  if (!cliInstalled) {
    console.log("❌ Cannot proceed - gemini-cli not installed\n");
    process.exit(1);
  }

  const configured = await testGeminiConfig();
  if (!configured) {
    console.log("❌ Cannot proceed - gemini-cli not authenticated\n");
    process.exit(1);
  }

  const fileRefWorks = await testFileReference();
  
  console.log("=" .repeat(60));
  if (cliInstalled && configured) {
    console.log("✅ Core tests passed! The MCP server should work.");
    if (fileRefWorks === "warning") {
      console.log("⚠️  File reference test had issues - this may affect some features.");
      console.log("   Basic prompts will still work fine.");
    }
    console.log("\nNext steps:");
    console.log("1. Install the plugin in Claude Code");
    console.log("2. Ask Claude to verify setup with gemini_check_setup");
    console.log("3. Try a review: 'Have Gemini review this code'");
  } else {
    console.log("❌ Some tests failed. Fix the issues above before using the plugin.");
  }
  console.log("=" .repeat(60));
}

runTests().catch((error) => {
  console.error("❌ Test script error:", error);
  process.exit(1);
});