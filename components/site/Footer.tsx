import { copyright } from "@/lib/site-nav";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-primary text-ink">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer-unpad.svg"
          alt="Universitas Padjadjaran"
          width={570}
          height={142}
          className="h-10 w-auto"
        />

        <p className="text-center text-xs font-medium text-ink-strong sm:text-right">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
