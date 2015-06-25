
VERSION=`grep VERSION src/settings.js | sed 's/[^[0-9.]//g'`

build:
	rm -fr Sports-Timer-$(VERSION)
	mkdir Sports-Timer-$(VERSION)
	cp -r index.html src/ css/ lib/ sounds/ Sports-Timer-$(VERSION)
	zip -r Sports-Timer-$(VERSION).zip Sports-Timer-$(VERSION)
