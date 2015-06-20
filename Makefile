all:
	@echo Nothing to do for all

install: bower_components local Commit-Rater/local


run-dev: bower_components local
	carton exec -- morbo cr-web

worker-dev: local pull
	carton exec -- ./cr-web minion worker -j 1


run-production: local
	carton exec -- hypnotoad cr-web

stop-production:
	carton exec -- hypnotoad -s cr-web


stats: pull
	mkdir -p stats
	: $${user?} $${repo?} $${output?}
	tmp=`mktemp` \
	&& cd Commit-Rater \
	&& carton exec ./commit-rater -r "https://git::@github.com/$$user/$$repo.git" \
	                                  > "$$tmp" \
	&& cd .. \
	&& cp "$$tmp" "$$output"


bower_components: bower.json
	bower install
	touch bower_components

local: cpanfile
	carton install
	touch local

Commit-Rater/local:
	git submodule update --init --remote
	cd Commit-Rater; make install


clean:
	rm -rf stats minion.db
	cd Commit-Rater; make clean

realclean: clean
	rm -rf local
	cd Commit-Rater; make realclean


.PHONY: all install run-dev pull
