/* eslint-disable react/no-unescaped-entities */
import "../App.css";
export default function Home() {
  return (
    <div className="max-w-4xl m-10 mx-auto border-2 bg-inherit border-slate-400 rounded-xl hover:border-slate-50">
      <div className="mx-auto font-mono text-center">
        <div className="m-10 text-2xl font-bold border-white">
          Welcome to our MERN-based authentication website!
        </div>
        <div className="mb-5">
          This project serves as an immersive journey through the intricate
          world of modern web development. With a focus on security, efficiency,
          and user experience, we've meticulously crafted each aspect of this
          platform.
        </div>
        <div className="mb-5">
          From seamless authentication mechanisms utilizing JSON Web Tokens and
          Google OAuth to robust state management with Redux Toolkit, every
          component is designed to provide a secure and smooth user experience.
          The dual-layer protection on critical pages like the profile page
          ensures the utmost security, while dynamic profile management empowers
          users to customize their experience effortlessly.
        </div>
        <div className="mb-5">
          Through mastering CRUD operations with MongoDB and deploying the
          application on Render, we aim to equip you with the skills needed to
          build and share robust full-stack applications confidently. So, dive
          in, explore, and embark on your journey towards becoming a proficient
          MERN stack developer.
        </div>
      </div>
    </div>
  );
}
