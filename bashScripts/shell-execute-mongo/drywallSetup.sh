#! /usr/bin/env bash

clear

echo "Setting up drywall"

echo "Type the name of the database you would like to populate with default data..."

read name

echo "Opening a Mongo terminal with database: $name"
echo "Populating database with default data."
echo
mongo 127.0.0.1:27017/"$name"  populateDrywall.js
echo

echo "Done."
