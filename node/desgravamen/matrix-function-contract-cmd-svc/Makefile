SHELL = /bin/bash
.DEFAULT_GOAL := help

GIT_BRANCH = master
REP_HOME   = $(shell echo "$(shell pwd | rev | cut -d "/" -f1 | rev)")

ifeq ($(REP_HOME),matrix-script-shelltool)
GIT_HOME = $(shell echo "$(PWD)")
else
GIT_HOME = $(shell echo "$(PWD)/.shelltool")
endif

init:
	@rm -rf .shelltool/ && rm -rf makefiles/
	@git clone git@github.com:MATRIXMVP/matrix-script-shelltool.git -b ${GIT_BRANCH} .shelltool
	@mkdir -p makefiles/ && cp -R .shelltool/makefiles/* makefiles/

-include makefiles/*.mk
-include .shelltool/makefiles/*.mk
