import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/logo.png";

export const Footer = () => {
  return (
    <footer className="border-y ">
      <div className="2xl:w-360 2xl:px-0 px-2 mx-auto py-8">
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-4">
            <Image
              src={logo.src}
              width={logo.width}
              height={logo.height}
              alt="logo"
              className="h-8 w-fit"
            />
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span>Наш адрес:</span>
                <span>г. Минск, ТЦ "НЕМИГА 3", 2 этаж, павильон 23</span>
              </div>
              <div className="flex flex-col gap-1">
                <span>Режим работы магазина:</span>
                <span>С 11:00 до 20:00 без выходных</span>
              </div>
              <div className="flex flex-col gap-1">
                <span>Телефон магазина:</span>
                <Link href="tel:+375291225400" className="w-fit">
                  +375 (29) 122-54-00{" "}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold">Информация</h3>
            <div className="flex flex-col gap-3">
              <Link
                href="#"
                target="_blank"
                className="text-text-neutral-tertiary hover:underline hover:bg-accent/20 hover:text-accent w-fit"
              >
                О нас
              </Link>
              <Link
                href="#"
                target="_blank"
                className="text-text-neutral-tertiary hover:underline hover:bg-accent/20 hover:text-accent w-fit"
              >
                Доставка и оплата
              </Link>
              <Link
                href="#"
                target="_blank"
                className="text-text-neutral-tertiary hover:underline hover:bg-accent/20 hover:text-accent w-fit"
              >
                Гарантия и возврат
              </Link>
              <Link
                href="#"
                target="_blank"
                className="text-text-neutral-tertiary hover:underline hover:bg-accent/20 hover:text-accent w-fit"
              >
                Договор оферты
              </Link>
              <Link
                href="#"
                target="_blank"
                className="text-text-neutral-tertiary hover:underline hover:bg-accent/20 hover:text-accent w-fit"
              >
                Реквизиты
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t py-2 flex justify-center">
        <span>©Copyright ООО "КОЛЛАПС бренд" 2026</span>
      </div>
    </footer>
  );
};
