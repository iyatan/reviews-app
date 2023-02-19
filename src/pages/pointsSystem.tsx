import { NextPage } from "next";

const PointsSystem: NextPage = () => {
  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl text-blue-500 mb-8">Points System</h1>
      <p className="mb-4">
        When you first sign up on the platform, you will have 0 points. In order
        to get your resume reviewed, you will need to earn points by reviewing
        other people&rsquo;s resumes.
      </p>

      <p className="mb-4">
        For every review you complete, you will earn 1 point. Once you have
        earned at least one point, you can upload your own resume and it will be
        added to the pool of documents that other users can review. The more
        points you earn, the more times your document will be reviewed by other
        users.
      </p>

      <p className="mb-4">
        For example, if you complete 3 reviews, you will earn 3 points. This
        means your document will be reviewed 3 times by other users.
      </p>

      <p className="mb-4">
        Here&rsquo;s an illustration to help visualize this:
      </p>

      <h2 className="text-2xl mb-4">Points System</h2>
      <table className="w-full mb-8">
        <thead>
          <tr>
            <th className="text-left">New User</th>
            <th className="text-right">Points: 0</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left">Leave a Review</td>
            <td className="text-right">Points: 1</td>
          </tr>
          <tr>
            <td className="text-left">Upload Your Resume</td>
            <td className="text-right">Points: 1</td>
          </tr>
          <tr>
            <td className="text-left">Leave 2 Reviews</td>
            <td className="text-right">Points: 2</td>
          </tr>
          <tr>
            <td className="text-left">Get Your Resume Reviewed 2 Times</td>
            <td className="text-right">Points: 2</td>
          </tr>
          <tr>
            <td className="text-left">Leave 3 Reviews</td>
            <td className="text-right">Points: 3</td>
          </tr>
          <tr>
            <td className="text-left">Get Your Resume Reviewed 3 Times</td>
            <td className="text-right">Points: 3</td>
          </tr>
          <tr>
            <td className="text-left">...</td>
            <td className="text-right">...</td>
          </tr>
        </tbody>
      </table>

      <p className="mb-4">
        As you can see in the illustration, the user starts with 0 points. They
        then review three resumes, earning 3 points. This means their document
        will be reviewed 3 times by other users.
      </p>

      <p className="mb-4">
        This point system ensures that users are contributing to the community
        by providing valuable feedback to others before they can request
        feedback for themselves. It encourages an active and engaged community
        where everyone is helping each other improve their resumes.
      </p>

      <p className="mb-4">
        As they earn more points, they can have their resume reviewed more
        times, as indicated by the increasing number of asterisks.
      </p>
    </div>
  );
};

export default PointsSystem;
