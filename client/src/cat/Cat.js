import "../App.css";
import "./style.css";
function Cat() {
  return (
    <div>
      <div class="cat-widget">
        <div class="cat">
          <img class="cat-image" src="cat-bg.png" alt="Virtual Cat" />
          <img class="cat-body" src="cat-body.png" alt="Virtual Cat" />
          <div class="cat-eyes">
            <img class="cat-eyesR" src="cat-rightEye.png" alt="Virtual Cat" />
            <img class="cat-eyesL" src="cat-leftEye.png" alt="Virtual Cat" />
          </div>
          <div class="cat-legs">
            <img class="cat-legsL" src="cat-leftLeg.png" alt="Virtual Cat" />
            <img class="cat-legsR" src="cat-rightLeg.png" alt="Virtual Cat" />
            <img class="cat-pawsL" src="cat-leftPaw.png" alt="Virtual Cat" />
            <img class="cat-pawsR" src="cat-rightPaw.png" alt="Virtual Cat" />
          </div>
          <img class="cat-tail" src="cat-tail.png" alt="Virtual Cat" />
        </div>

        <div class="controls">
          <button class="btn feed-btn">Feed</button>
          <button class="btn play-btn">Play</button>
          <button class="btn clean-btn">Clean</button>
        </div>

        <div id="clock1"></div>
      </div>

      <div class="mirror">
        <div class="cat-widget">
          <div class="cat">
            <img class="cat-image" src="cat-bg.png" alt="Virtual Cat" />
            <img class="cat-body" src="cat-body.png" alt="Virtual Cat" />
            <div class="cat-eyes">
              <img class="cat-eyesR" src="cat-rightEye.png" alt="Virtual Cat" />
              <img class="cat-eyesL" src="cat-leftEye.png" alt="Virtual Cat" />
            </div>
            <div class="cat-legs">
              <img class="cat-legsL" src="cat-leftLeg.png" alt="Virtual Cat" />
              <img class="cat-legsR" src="cat-rightLeg.png" alt="Virtual Cat" />
              <img class="cat-pawsL" src="cat-leftPaw.png" alt="Virtual Cat" />
              <img class="cat-pawsR" src="cat-rightPaw.png" alt="Virtual Cat" />
            </div>
            <img class="cat-tail" src="cat-tail.png" alt="Virtual Cat" />
          </div>

          <div class="controls">
            <button class="btn feed-btn">Feed</button>
            <button class="btn play-btn">Play</button>
            <button class="btn clean-btn">Clean</button>
          </div>
          <div id="clock2"></div>
        </div>
      </div>
    </div>
  );
}

export default Cat;
