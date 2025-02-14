#!/bin/sh
IFS=$'\n'
echo "window.env = {"
for i  in $(set | grep "REACT_APP"); do
    echo "   $i," | sed -e 's/=/: /'
done
echo "};"