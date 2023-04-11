import Image from 'next/image'
import { Inter } from 'next/font/google';
import { createClient } from 'next-sanity';

const inter = Inter({ subsets: ['latin'] })

export default function Home({blogs}) {
  console.log(blogs);
  return (
    <div className="home">
      <div className="nav bg-gray-400 text-red-600">
        I am navbar
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
