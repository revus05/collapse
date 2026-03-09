import { formatUserDate } from "entity/user";
import { getMeOnServer } from "entity/user/lib";
import { UpdateProfileForm } from "features/user/update-profile";
import { redirect } from "next/navigation";
import { paths } from "shared/navigation/paths";
import { Badge } from "shared/ui/badge";
import { withHomeLayout } from "widgets/layouts/home";

const ProfilePage = async () => {
  const user = await getMeOnServer();

  if (!user) {
    redirect(paths.signIn);
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Профиль</h1>
          <p className="text-muted-foreground">
            Управляйте своими данными и аватаром.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{user.currency}</Badge>
          <Badge variant="outline">{user.role}</Badge>
          <Badge variant="outline">
            Создан {formatUserDate(user.createdAt)}
          </Badge>
        </div>
      </div>

      <UpdateProfileForm user={user} />
    </div>
  );
};

export default withHomeLayout(ProfilePage);
