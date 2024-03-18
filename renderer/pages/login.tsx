import React, { useEffect } from 'react';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import useLoginMutation from '@/modules/common/hooks/useLoginMutation';
import Loader from '@/modules/common/components/atoms/Loader';
import PageLayout from '@/modules/common/components/templates/PageLayout';
import Footer from '@/modules/common/components/molecules/Footer';
import WhatsappButton from '@/modules/common/components/atoms/WhatsappButton';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAuthState } from '@/modules/common/contexts/AuthContext';
import { ORDENES_URL } from '@/modules/common/consts';

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const loginMutation = useLoginMutation();
  const router = useRouter();
  const { isLoggedIn } = useAuthState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({
        email,
        password,
      });
    } catch (error: any) {
      switch (error?.error?.status) {
        case 500:
        case 401: {
          toast.error('No existe un usuario con ese correo y/o contraseña');
        }
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push(ORDENES_URL);
    }
  }, [isLoggedIn]);

  return (
    <PageLayout>
      {loginMutation.isLoading ? (
        <Loader />
      ) : (
        <div className="flex w-full max-w-md flex-col items-center justify-start gap-y-5">
          <form
            onSubmit={handleSubmit}
            className="flex h-full w-full flex-col gap-y-5 rounded-md bg-base-100 p-6 shadow-md md:mt-16 md:h-fit md:w-full"
          >
            <h2 className="text-2xl font-semibold">Iniciar Sesión</h2>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block">
                Correo Electrónico (e-mail)
              </label>
              <div className="flex items-center rounded-md border bg-base-100-focus px-3 py-2">
                <EnvelopeIcon className="h-5 w-5" />
                <input
                  id="email"
                  type="email"
                  required
                  className="ml-2 w-full bg-transparent outline-none"
                  style={{
                    fontFamily: 'sans-serif',
                  }}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="mb-1 block">
                Contraseña
              </label>
              <div className="flex items-center rounded-md border bg-base-100-focus px-3 py-2">
                <LockClosedIcon className="h-5 w-5" />
                <input
                  id="password"
                  type="password"
                  required
                  style={{
                    fontFamily: 'sans-serif',
                  }}
                  className="ml-2 w-full bg-transparent outline-none"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 font-semibold text-primary-content hover:bg-blue-600"
            >
              Iniciar Sesión
            </button>
          </form>
          <WhatsappButton />
        </div>
      )}
      <Footer />
    </PageLayout>
  );
};

export default LoginPage;
