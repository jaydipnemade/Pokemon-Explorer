import Link from 'next/link';

type Props = {
  name: string;
  url: string;
  index: number;
};

export default function PokemonCard({ name, index }: Props) {
  const paddedId = String(index).padStart(3, '0');
  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;

  return (
    <Link href={`/pokemon/${name}`}>
      <div className="bg-white p-4 rounded shadow hover:shadow-lg transition text-center cursor-pointer">
        <img src={imageUrl} alt={name} className="mx-auto w-20 h-20" />
        <p className="capitalize font-semibold mt-2">{name}</p>
      </div>
    </Link>
  );
}
