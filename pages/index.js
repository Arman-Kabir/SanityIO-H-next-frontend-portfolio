import Image from 'next/image'
import { Inter } from 'next/font/google';
import { createClient } from 'next-sanity';
import PortableText from "react-portable-text"

const inter = Inter({ subsets: ['latin'] })

export default function Home({ blogs }) {
  console.log(blogs[0]);
  return (
    <div className="home mx-8">
      <h1>{blogs[0].title}</h1>
      <div className="mx-8">
        {/* {blogs[0].content}, */}

        <PortableText
          // Pass in block content straight from Sanity.io
          content={blogs[0].content}
          projectId='l3pmll7s'
          dataset='production'
          // Optionally override marks, decorators, blocks, etc. in a flat
          // structure without doing any gymnastics
          serializers={{
            h1: (props) => <h1 style={{ color: "red" }} {...props} />,
            li: ({ children }) => <li className="special-list-item">{children}</li>,

          }}

        />
      </div>
      <span>I am homepage</span>
    </div>
  )
}

export async function getServerSideProps(context) {
  const client = createClient({
    projectId: 'l3pmll7s',
    dataset: 'production',
    useCdn: false
  });
  const query = `*[_type == "blog"]`;
  const blogs = await client.fetch(query);
  return {
    props: {
      blogs
    }
  }
}
