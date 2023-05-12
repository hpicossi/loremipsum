#!/bin/bash

# Contar líneas en los archivos loremipsum-*.txt
for archivo in loremipsum-*.txt
do
	lineas=$(wc -l $archivo | cut -d' ' -f1)
	echo "$archivo tiene $lineas líneas."
done
