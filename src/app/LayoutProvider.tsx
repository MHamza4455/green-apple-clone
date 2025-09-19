'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { AdminLayout } from './adminLayout';
import { UserLayout } from '@/components/UserLayout';
import { StandardLayout } from '@/components/StandardLayout';

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const pathname = usePathname();

  const getLayout = pathname.includes('/admin')
    ? (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
    : (page: ReactNode) => <UserLayout>{page}</UserLayout>;

  return (
    <StandardLayout>
      {getLayout(children)}
    </StandardLayout>
  );
};
