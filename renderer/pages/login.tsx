import React from 'react';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import useLoginMutation from '@/hooks/services/useLoginMutation';
import Loader from '@/components/Loader';
import PageLayout from '@/components/PageLayout';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
import { toast } from 'react-toastify';
import CustomToastContainer from '@/components/CustomToastContainer';

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const loginMutation = useLoginMutation();

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

  return (
    <PageLayout>
      <CustomToastContainer />
      {loginMutation.isLoading ? (
        <Loader />
      ) : (
        <div className="flex w-full max-w-md flex-col items-center justify-start gap-y-5">
          <form
            onSubmit={handleSubmit}
            className="flex h-full w-full flex-col gap-y-5 rounded-md bg-white p-6 shadow-md md:mt-16 md:h-fit md:w-full"
          >
            <h2 className="text-2xl font-semibold">Iniciar Sesión</h2>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block">
                Correo Electrónico (e-mail)
              </label>
              <div className="flex items-center rounded-md border bg-gray-50 px-3 py-2">
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
              <div className="flex items-center rounded-md border bg-gray-50 px-3 py-2">
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
              className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
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
