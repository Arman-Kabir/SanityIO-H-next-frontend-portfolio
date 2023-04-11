import Image from 'next/image'
import { Inter } from 'next/font/google';
import { createClient } from 'next-sanity';

const inter = Inter({ subsets: ['latin'] })

export default function Home({blogs}) {
  console.log(blogs[0]);
  return (
    <div className="home">
      <h1>{blogs[0].title}</h1>
      <div className="nav bg-gray-400 text-red-600">
        {blogs[0].content}
      </div>
      <span>I am homepage</span>
    </div>
  )
}

export async function getServerSideProps(context) {
  const client = createClient({
    projectId: 'l3pmll7s',
    dataset: 'production',
    useCdn: true
  });
  const query = `*[_type == "blog"]`;
  const blogs = await client.fetch(query);
  return {
    props: {
      blogs
    }
  }
}
