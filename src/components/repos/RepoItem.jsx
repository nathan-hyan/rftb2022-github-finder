import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from 'react-icons/fa';

function RepoItem({
  item: {
    name,
    description,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count,
  },
}) {
  return (
    <div className="mb-2 rounded-md card bg-gray-800 hover:bg-gray-900">
      <a href={html_url}>
        <div className="card-body">
          <h3 className="mb-2 text-xl font-semibold">
            <FaLink className="inline mr-1" />
            {name}
          </h3>
          <p className="mb-3">{description}</p>
          <div>
            <div className="mr-2 badge badge-info badge-lg">
              <FaEye className="mr-2" /> {watchers_count}
            </div>
            <div className="mr-2 badge badge-success badge-lg">
              <FaStar className="mr-2" /> {stargazers_count}
            </div>
            <div className="mr-2 badge badge-error badge-lg">
              <FaInfo className="mr-2" /> {open_issues}
            </div>
            <div className="mr-2 badge badge-warning badge-lg">
              <FaUtensils className="mr-2" /> {forks}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
export default RepoItem;
