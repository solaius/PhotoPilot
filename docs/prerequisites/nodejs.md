# Node.js Installation Guide

PhotoPilot requires Node.js version 14.x or higher. This guide will help you install Node.js on your operating system.

## Linux

### Using NVM (Recommended)

Node Version Manager (NVM) allows you to install and manage multiple versions of Node.js.

1. Install NVM:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   ```

2. Close and reopen your terminal, or run:
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

3. Install the latest LTS version of Node.js:
   ```bash
   nvm install --lts
   ```

4. Verify the installation:
   ```bash
   node --version
   npm --version
   ```

### Using Package Manager

#### Debian/Ubuntu:

1. Update your package index:
   ```bash
   sudo apt update
   ```

2. Install Node.js and npm:
   ```bash
   sudo apt install nodejs npm
   ```

3. Verify the installation:
   ```bash
   node --version
   npm --version
   ```

   If the version is below 14.x, you may need to use a PPA:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

#### Fedora/RHEL/CentOS:

1. Install Node.js and npm:
   ```bash
   sudo dnf install nodejs
   ```

2. Verify the installation:
   ```bash
   node --version
   npm --version
   ```

## macOS

### Using Homebrew (Recommended)

1. Install Homebrew if you don't have it:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install Node.js:
   ```bash
   brew install node
   ```

3. Verify the installation:
   ```bash
   node --version
   npm --version
   ```

### Using NVM

1. Install NVM:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   ```

2. Close and reopen your terminal, or run:
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

3. Install the latest LTS version of Node.js:
   ```bash
   nvm install --lts
   ```

4. Verify the installation:
   ```bash
   node --version
   npm --version
   ```

### Using Installer

1. Download the macOS installer from the [official Node.js website](https://nodejs.org/).
2. Run the installer and follow the instructions.
3. Verify the installation:
   ```bash
   node --version
   npm --version
   ```

## Windows 11 with WSL 2.0 (Ubuntu)

### Setting Up WSL 2.0

1. Open PowerShell as Administrator and run:
   ```powershell
   wsl --install
   ```

2. Restart your computer when prompted.

3. After restart, a terminal will open automatically to complete the Ubuntu setup. Create a username and password.

4. Update your Ubuntu packages:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

### Installing Node.js in WSL

1. Install NVM:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   ```

2. Close and reopen your terminal, or run:
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

3. Install the latest LTS version of Node.js:
   ```bash
   nvm install --lts
   ```

4. Verify the installation:
   ```bash
   node --version
   npm --version
   ```

## Troubleshooting

### Permission Issues

If you encounter permission errors when installing global packages with npm, you can:

1. Change npm's default directory:
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   ```

2. Add the following to your `.bashrc` or `.zshrc`:
   ```bash
   export PATH=~/.npm-global/bin:$PATH
   ```

3. Update your current session:
   ```bash
   source ~/.bashrc  # or source ~/.zshrc
   ```

### Node.js Version Issues

If you need to switch between Node.js versions, NVM is the best tool:

```bash
# List installed versions
nvm ls

# Install a specific version
nvm install 16

# Use a specific version
nvm use 16

# Set a default version
nvm alias default 16
```

## Next Steps

After installing Node.js, proceed to installing [MongoDB](mongodb.md) and [Redis](redis.md).