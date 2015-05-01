#!/bin/bash

GSD5TICK_DIR=`pwd`
GSD5_DIR=$GSD5TICK_DIR/../gsd5
TIDDLYWIKI5_DIR=$GSD5TICK_DIR/../TiddlyWiki5

export TIDDLYWIKI_PLUGIN_PATH=$GSD5_DIR/plugins
export TW_SERVE_EDITION_PATH=$GSD5TICK_DIR/editions/gsd5-ticklers
( cd $TIDDLYWIKI5_DIR && ./bin/serve.sh )
