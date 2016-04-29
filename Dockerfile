FROM centurylink/ca-certs
MAINTAINER EOGILE "agilestack@eogile.com"

ENV name login-ui

ENV workdir /plugin
ENV builddir $workdir/build

ENV baseUrl login
EXPOSE 8080

LABEL SERVICE_TAGS="urlprefix-/$baseUrl" \
      SERVICE_CHECK_HTTP="/status" \
      SERVICE_CHECK_INTERVAL="10s"

WORKDIR $workdir
ADD $name $workdir/$name
ADD build $builddir

ENTRYPOINT ["./login-ui"]
