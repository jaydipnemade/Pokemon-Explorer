export default function Footer() {
    return (
      <footer className="bg-black text-white py-4 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} PokeWorld. All rights reserved.
        </div>
      </footer>
    );
  }
  