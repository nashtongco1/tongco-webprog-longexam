import { useEffect, useState } from 'react';
import Button from '../../components/Button.jsx';

const inputClasses =
  'mt-2 w-full rounded-xl border border-purple-300 bg-purple-100 px-4 py-3 text-sm text-purple-900 outline-none transition placeholder:text-purple-400 focus:border-purple-900 focus:bg-purple-50';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchProfile = async () => {
    if (!token) {
      setError('Please log in first');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/users/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Unable to load profile');
        return;
      }

      setUser(data);
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      console.error(error);
      setError('Unable to connect to the server');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setProfileMessage('');

    try {
      const response = await fetch(
        'http://localhost:5000/api/users/profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setProfileMessage(
          data.message || 'Unable to update profile'
        );
        return;
      }

      setUser(data.user);

      localStorage.setItem(
        'user',
        JSON.stringify(data.user)
      );

      setProfileMessage('Profile updated successfully');
    } catch (error) {
      console.error(error);
      setProfileMessage('Unable to connect to the server');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setPasswordMessage('');

    if (!currentPassword || !newPassword) {
      setPasswordMessage('Please fill in all password fields');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/users/change-password',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setPasswordMessage(
          data.message || 'Unable to change password'
        );
        return;
      }

      setCurrentPassword('');
      setNewPassword('');

      setPasswordMessage('Password changed successfully');
    } catch (error) {
      console.error(error);
      setPasswordMessage('Unable to connect to the server');
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">

      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
            Customer Account
          </p>

          <h1 className="text-3xl font-bold leading-tight text-purple-900 sm:text-4xl">
            My Profile
          </h1>

          <div className="mt-6">
            <Button to="/">Back Home</Button>
          </div>

        </div>
      </section>

      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">

          {error && (
            <p className="text-sm text-purple-700">
              {error}
            </p>
          )}

          {user && (
            <>
              <h2 className="text-2xl font-semibold text-purple-900">
                Profile Information
              </h2>

              <form
                className="mt-6 space-y-5"
                onSubmit={handleUpdateProfile}
              >

                <div>
                  <label className="text-sm font-medium text-purple-700">
                    Name
                  </label>

                  <input
                    type="text"
                    className={inputClasses}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-700">
                    Email
                  </label>

                  <input
                    type="email"
                    className={inputClasses}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <p className="text-sm text-purple-600">
                    Role: {user.role}
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                >
                  Update Profile
                </Button>

                {profileMessage && (
                  <p className="text-sm text-purple-700">
                    {profileMessage}
                  </p>
                )}

              </form>
            </>
          )}

        </div>
      </section>

      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">

          <h2 className="text-2xl font-semibold text-purple-900">
            Change Password
          </h2>

          <form
            className="mt-6 space-y-5"
            onSubmit={handleChangePassword}
          >

            <div>
              <label className="text-sm font-medium text-purple-700">
                Current Password
              </label>

              <input
                type="password"
                className={inputClasses}
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-purple-700">
                New Password
              </label>

              <input
                type="password"
                className={inputClasses}
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
              />
            </div>

            <Button
              type="submit"
              variant="primary"
            >
              Change Password
            </Button>

            {passwordMessage && (
              <p className="text-sm text-purple-700">
                {passwordMessage}
              </p>
            )}

          </form>

        </div>
      </section>

    </div>
  );
};

export default ProfilePage;