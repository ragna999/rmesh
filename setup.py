#!/usr/bin/env python3
"""
RMESH Installer — Universal agent router for Bankr ecosystem

Usage:
  pip install rmesh
  # or
  python3 -m pip install rmesh

Then:
  rmesh status
  rmesh resolve @0xdeployer
  rmesh ask "What is Base?"
"""

from setuptools import setup, find_packages

setup(
    name="rmesh",
    version="0.1.0",
    description="Universal agent router for Bankr ecosystem — Signa + Net Protocol",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    author="Ragna",
    author_email="ragna@ragna.dev",
    url="https://github.com/ragna999/rmesh",
    project_urls={
        "Bug Tracker": "https://github.com/ragna999/rmesh/issues",
        "Source": "https://github.com/ragna999/rmesh",
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Topic :: Software Development :: Libraries",
        "Topic :: Internet :: WWW/HTTP",
    ],
    python_requires=">=3.10",
    packages=find_packages(),
    install_requires=[
        "mcp>=1.0.0",
    ],
    entry_points={
        "console_scripts": [
            "rmesh=rmesh.cli:main",
            "rmesh-mcp=rmesh.mcp_server:main",
        ],
    },
)
