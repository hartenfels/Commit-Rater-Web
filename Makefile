all:
	@echo Nothing to do for all

install: public/components local Commit-Rater


run-dev: public/components local
	carton exec -- morbo cr-web

worker-dev: local pull
	carton exec -- ./cr-web minion worker -j 1


run-production: local
	carton exec -- hypnotoad cr-web

stop-production:
	carton exec -- hypnotoad -s cr-web


public/components: bower.json .bowerrc
	bower install
	touch public/components

cpanfile: cpanfile.web Commit-Rater/cpanfile
	cat $^ > cpanfile

local: cpanfile
	carton install
	touch local

Commit-Rater:
	git submodule update --init --remote


clean:
	rm -rf __repos minion.db stats

realclean: clean
	rm -rf local


.PHONY: all install run-dev worker-dev run-production stop-production
