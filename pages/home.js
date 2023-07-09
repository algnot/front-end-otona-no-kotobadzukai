import { checkWantToLogin } from '../common/user';

export async function getServerSideProps(context) {
  const redirect = await checkWantToLogin(context.req.cookies.auth);
  return redirect;
}
export default function Home({user}) {
  
  return (
    <div>{JSON.stringify(user)}</div>
  )
}
