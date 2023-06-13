import Image from "next/image";
import Link from "next/link";

function NavMenu(props) {
  return (
    <nav className=" col-span-2 lg:col-span-3 inline-grid px-2">
      <div className="flex justify-between">
        <Image
          src="/lilBits.png"
          alt="LilBits Logo"
          width={200}
          height={1}
        ></Image>
        <Link
          href="./"
          className="bg-kale rounded border-2 border-wine px-1 self-center text-lime text-xl font-bold h-8 hover:bg-white hover:text-wine "
        >
          HOME PAGE
        </Link>
      </div>
    </nav>
  );
}

export default NavMenu;
