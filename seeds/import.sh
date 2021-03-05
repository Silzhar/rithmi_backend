#!/bin/bash

mongoimport --host db:27017 --db rithmi /seed/samples.json --collection samples --jsonArray --mode upsert
