all:
	@echo Nothing to do for all

install: Commit-Rater local


run-dev: local
	carton exec -- morbo cr-web

worker-dev: local pull
	carton exec -- ./cr-web minion worker -j 1


run-production: local
	carton exec -- hypnotoad cr-web

stop-production:
	carton exec -- hypnotoad -s cr-web


data: pull
	mkdir -p data
	: $${user?} $${repo?} $${output?}
	Commit-Rater/run "https://github.com/$$user/$$repo.git" > tmp.json
	cp tmp.json "$$output"


local: cpanfile
	carton install

Commit-Rater:
	git clone https://github.com/hartenfels/Commit-Rater.git

pull: Commit-Rater
	cd Commit-Rater; git pull; carton install


.PHONY: all install run-dev pull
