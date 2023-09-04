import { Seed } from "~~/schemas/seed";
import { useDomain } from "./useDomain";

const domain = useDomain();

export const useSeedSocialLink = (seed: Partial<Seed>): string => `${domain}/seeds/${seed.slug}`;