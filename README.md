A quick project to understand figment enriched API for polkadot

---

At first install required dependencies

```bash
yarn install
```

To run the developpement server

```bash
yarn dev
```

To build

```bash
yarn build
```

Then you can run the production server

```bash
yarn install
yarn start
```

To rebuild db

```
touch .env
echo "API_KEY=<API-KEY>" > .env
node data/run
```
