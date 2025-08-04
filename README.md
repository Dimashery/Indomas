This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Lakukan cloning repository github Indomas ini dengan menjalankan perintah ini di CMD :

```bash
git clone --branch main https://github.com/Dimashery/Indomas.git
```
2. Buka Project NextJS nya, dan langkah selanjutnya bisa menuliskan perintah berikut di VSCODE anda (bisa Powershell atau CMD) :
Note : Gunakan sistem Bun untuk Runtime Typescript, untuk dokumentasi nya bisa dilihat pada Link berikut ini :

```bash
[bun install](https://bun.sh/docs/installation)

Untuk Menginstall Dependencies NextJs : 
bun install
```

3. Untuk menjalankan Project NextJS secara Lokal maka bisa di ketikkan pada CMD / Powershell di Vscode :

```bash
bun run dev (untuk menjalankan NextJs)
```

4. Saat melakukan Git Clone dan menjalankan project nya, harus membuat file baru dengan nama .env dan isinya sebagai berikut :

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```


Buka [http://localhost:3000](http://localhost:3000) Melalui Website untuk melihat hasilnya.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
