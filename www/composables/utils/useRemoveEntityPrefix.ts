import { EntityType } from "~~/schemas/entity";

export const useRemoveEntityPrefix = (id: string, type: EntityType) => decodeURIComponent(id.replace(new RegExp(`^${type}__`), ''));