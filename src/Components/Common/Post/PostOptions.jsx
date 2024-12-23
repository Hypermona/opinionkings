import React from "react";
import ProgressButton from "../../ProgressButton/ProgressButton";
import { useMutation } from "urql";
import { UPDATE_OPINION } from "../../../Queries/Post";
import token from "../../../Store/token";
import posts from "../../../Store/posts";
import authModal from "../../../Store/authModal";

function getOpinionConfigs(userId, opinions = []) {
  let selectedOpinion = null;
  let totalOpinons = 0;
  let percentageList = [];
  if (!opinions.length) {
    return { selectedOpinion, percentageList };
  }
  for (let opinion of opinions) {
    if (opinion?.selectedBy?.includes(userId)) {
      selectedOpinion = opinion.value;
    }
    totalOpinons += opinion.selectedBy?.length || 0;
    percentageList.push(opinion.selectedBy?.length || 0);
  }
  percentageList = percentageList.map((value) => Math.round((value / totalOpinons) * 100));
  return { selectedOpinion, percentageList };
}

function PostOptions({ post }) {
  const [_, updateOpinion] = useMutation(UPDATE_OPINION);
  const { getUser } = token.useContainer();
  const { updateOpinions } = posts.useContainer();
  const { handleOpen } = authModal.useContainer();
  const user = getUser();
  let { selectedOpinion, percentageList } = getOpinionConfigs(user.id, post?.opinions);
  async function onOpinion(optionValue) {
    if (!user.id) {
      handleOpen();
    }
    if (selectedOpinion) {
      return;
    }
    const res = await updateOpinion({ postId: post.id, optionValue });
    updateOpinions(post.id, res?.data?.updateOpinion?.opinions);
  }

  return (
    <div style={{ padding: 10 }}>
      {post?.opinions?.map((opinion, i) => {
        return (
          <ProgressButton
            showValues={selectedOpinion}
            isSelected={selectedOpinion === opinion.value}
            percentage={percentageList[i]}
            variant="outlined"
            style={{ width: "100%", justifyContent: "start", marginBottom: 10 }}
            onClick={() => onOpinion(opinion.value)}
          >
            {opinion.label}
          </ProgressButton>
        );
      })}
    </div>
  );
}

export default PostOptions;
