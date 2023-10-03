import { EntityType } from "~~/schemas/entity";

export const useEntityId = (key: string, type: EntityType) => `${type}__${key}`;