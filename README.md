# Next Auth

```bash
# create application
$ npx create-next-app@Latest auth-tutorial

# initialize shadcn
$ npx shadcn-ui@latest init

# other required deps
$ yarn add -D prisma
$ yarn add @prisma/client

```

### Prisma

```bash
# initialize prisma
$ npx prisma init

# optional free postresdb on neon.tech
# generate prisma (NEED INTERNET CONNECTION)
$ npx prisma generate

# push changes to db
$ npx prisma db push

# open prisma studion on browser
$ npx prisma studio

# before resetting the db, logout current user session
# reset the db
$ npx prisma migrate reset

# every reset, run
$ npx prisma db push
```

### AuthJS

```bash
# goto authjs.dev
# install dependencies
$ yarn add @auth/prisma-adapter

# for google oauth, goto console.cloud.google.com
# search for apis and services
# credentials > create > oauth client id

# refer the docts here https://authjs.dev/guides/upgrade-to-v5

# use resend.com for sending email validation

```
