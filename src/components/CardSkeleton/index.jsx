import ContentLoader from "react-content-loader";

const CardSkeleton = () => {
  return (
    <ContentLoader speed={2} width="100%" backgroundColor="#eeeeee" foregroundColor="#e6e6e6">
      <rect x="0" y="0" rx="2" width="100%" height="100%" />
    </ContentLoader>
  );
};

export default CardSkeleton;
