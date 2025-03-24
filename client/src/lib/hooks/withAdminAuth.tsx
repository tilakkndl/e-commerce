import { ComponentType } from "react";
import { useAdminAuth } from "./useAdminAuth";

export function withAdminAuth<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return function WithAdminAuthComponent(props: P) {
    const { isLoading, isAdmin } = useAdminAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAdmin) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
