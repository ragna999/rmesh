#!/usr/bin/env node

/**
 * RMESH — Universal agent router for Bankr ecosystem
 * 
 * This is a Node.js wrapper that calls the Python CLI.
 * Requires Python 3 and optionally Foundry (cast) for Net Protocol operations.
 */

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Find Python
function findPython() {
    const candidates = ['python3', 'python'];
    for (const cmd of candidates) {
        try {
            execSync(`${cmd} --version`, { stdio: 'ignore' });
            return cmd;
        } catch (e) {}
    }
    return null;
}

// Check if Python package is installed
function checkPackage() {
    try {
        execSync('python3 -c "import rmesh"', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

// Install package
function installPackage(python) {
    console.log('📦 Installing rmesh Python package...');
    try {
        execSync(`${python} -m pip install rmesh`, { stdio: 'inherit' });
        return true;
    } catch (e) {
        console.error('❌ Failed to install rmesh package');
        console.error('   Try: pip install rmesh');
        return false;
    }
}

// Main
function main() {
    const python = findPython();
    
    if (!python) {
        console.error('❌ Python 3 not found.');
        console.error('   Install: https://www.python.org/downloads/');
        process.exit(1);
    }
    
    // Check if package is installed
    if (!checkPackage()) {
        const installed = installPackage(python);
        if (!installed) process.exit(1);
    }
    
    // Get args (skip 'node' and script path)
    const args = process.argv.slice(2);
    
    // Run the Python CLI
    const child = spawn(python, ['-m', 'rmesh.cli', ...args], {
        stdio: 'inherit',
        shell: true
    });
    
    child.on('exit', (code) => {
        process.exit(code || 0);
    });
    
    child.on('error', (err) => {
        console.error(`❌ Error: ${err.message}`);
        process.exit(1);
    });
}

main();
