"use client";

import { ProtectedRouteComponent } from "@/components/protected-route";
import {
	Ability,
	AbilityBuilder,
	AbilityTuple,
	MongoQuery,
	createMongoAbility,
} from "@casl/ability";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import * as React from "react";

type RoleType = "admin" | "manager" | "employee" | null;
type Actions = "manage" | "read" | "create" | "update" | "delete";
type Subjects = "Users" | "Dashboard" | "all";

interface AuthContextType {
	role: RoleType;
	ability: Ability;
}

interface CanProps {
	I: Actions;
	a: Subjects;
	children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({
	role: null,
	ability: createMongoAbility<AbilityTuple, MongoQuery>(),
});

export const Can: React.FC<CanProps> = ({
	I: action,
	a: subject,
	children,
}) => {
	const { ability } = useAuth();
	return ability.can(action, subject) ? <>{children}</> : null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const defineAbilities = (role: Exclude<RoleType, null>) => {
		const { can, build } = new AbilityBuilder<Ability<[Actions, Subjects]>>(
			createMongoAbility,
		);

		switch (role) {
			case "admin":
				can("manage", "all");
				break;
			case "manager":
				can("read", "Dashboard");
				can("manage", "Users");
				break;
			case "employee":
				can("read", "Dashboard");
				break;
		}

		return build();
	};

	const [ability, setAbility] = React.useState(
		createMongoAbility<AbilityTuple, MongoQuery>(),
	);

	const token = (getCookie("token") as string) || null;
	const decodeToken = token
		? jwtDecode<{ role: Exclude<RoleType, null> }>(token)
		: null;
	const role = decodeToken ? decodeToken.role : null;

	React.useEffect(() => {
		if (role) {
			setAbility(defineAbilities(role));
		}
	}, [role]);

	return (
		<AuthContext.Provider value={{ role, ability }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => React.useContext(AuthContext);

export const usePermission = () => {
	const { ability } = useAuth();
	return {
		can: (action: Actions, subject: Subjects) => ability.can(action, subject),
		cannot: (action: Actions, subject: Subjects) =>
			ability.cannot(action, subject),
	};
};

export const ProtectedRoute: React.FC<{
	children: React.ReactNode;
	requiredPermission?: { action: Actions; subject: Subjects };
}> = ({ children, requiredPermission }) => {
	const { role, ability } = useAuth();
	// const router = useRouter();

	if (!role) return null;

	const isAllowed = requiredPermission
		? ability.can(requiredPermission.action, requiredPermission.subject)
		: true;

	if (!isAllowed) {
		// router.push("/403");
		// return;
		return <ProtectedRouteComponent />;
	}

	return <>{children}</>;
};
