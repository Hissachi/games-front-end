import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export const defineAbilitiesFor = (role: string) => {
	const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

	switch (role) {
		case "admin":
			can("manage", "all");
			break;
		case "manager":
			can("read", "all");
			can("update", "User");
			cannot("delete", "User");
			break;
		case "employee":
			can("read", "all");
			cannot("update", "User");
			cannot("delete", "User");
			break;
		default:
			can("read", "all");
	}

	return build();
};
