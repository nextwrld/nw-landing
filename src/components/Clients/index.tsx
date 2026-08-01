import SingleClient from "./SingleClient";
import type { Client } from "@/types/client";

const clientsData: Client[] = [];

const Clients = () => {
  if (clientsData.length === 0) {
    return null;
  }

  return (
    <section className="pb-0 dark:bg-dark">
      <div className="container px-4">
        <div className="-mx-4 flex flex-wrap items-center justify-center gap-8 xl:gap-11">
          {clientsData.map((client) => (
            <SingleClient key={client.id} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
