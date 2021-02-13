#!/bin/sh

echo "$1" | xxd -r -p | base64
