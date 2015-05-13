#!/bin/bash

GSD5TICK_DIR=`pwd`
TIDDLYWIKI5_DIR=$GSD5TICK_DIR/../TiddlyWiki5

OUTPUT_DIR=$GSD5TICK_DIR/output
OUTPUT_FILE=gsd5-ticklers.html
mkdir -p $OUTPUT_DIR

export TIDDLYWIKI_PLUGIN_PATH=$GSD5TICK_DIR/plugins

( cd $TIDDLYWIKI5_DIR && node ./tiddlywiki.js \
	$GSD5TICK_DIR/editions/gsd5 \
	--verbose \
	--output $GSD5TICK_DIR/output \
	--rendertiddler $:/core/save/all $OUTPUT_FILE text/plain )

echo Wrote $OUTPUT_DIR/$OUTPUT_FILE maybe
