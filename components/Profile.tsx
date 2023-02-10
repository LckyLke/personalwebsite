// components/Profile.tsx

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className="object-cover w-32 h-32"
        src="/profile_picture.png"
        alt="Profile picture"
      />
      <h1 className="mt-4 text-2xl font-bold">Luke Friedrichs</h1>
      <p className="mt-2 text-lg text-gray-600">
        Computer Science Student, Paderborn
      </p>
    </div>
  );
};

export default Profile;
