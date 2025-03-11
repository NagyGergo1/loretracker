import { callphpFunction } from "./index.js";

function $(id) {
    return document.getElementById(id);
}

let kiiras = $("actual_page");

async function jatekAdatBetolt() {
    kiiras.innerHTML += `
        <h1>Main Quest</h1>
        <div class="chapter">
            <h2 style="background-color: orange;">Chapter 1</h2>
            <div class="section">
                <h2>Section Title</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisi felis, dapibus quis ex quis, varius imperdiet tellus. Nulla aliquet tempor sapien, quis rutrum tellus scelerisque vel. Sed nec lacinia nisl. Nunc et efficitur leo. Aenean ornare blandit odio, eu pulvinar mauris. Pellentesque sit amet gravida odio. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc at porttitor magna, id tempor risus. Donec ex sapien, faucibus eget metus a, aliquet dapibus leo.</p>
                <p>Ut pulvinar, turpis sed viverra ornare, leo odio ornare leo, a aliquam nibh dolor at nibh. Nam auctor est vel finibus hendrerit. Fusce vulputate orci enim, id laoreet est pretium id. Cras mattis facilisis nisl, vitae blandit nibh consectetur eu. In lobortis libero vel sagittis interdum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque tempor posuere lorem, vel consectetur mauris interdum non.</p>
            </div>
            <div class="section">
                <h2>Section Title</h2>
                <p>Curabitur in libero vulputate, molestie nibh a, hendrerit est. Nam molestie risus a efficitur gravida. Mauris massa elit, mattis at diam ut, congue scelerisque nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent vitae semper diam, vitae dignissim quam. Nunc varius nulla a placerat aliquam. Integer elementum imperdiet tempus. Praesent ut vestibulum lacus. Phasellus euismod est quis arcu accumsan, eget tempor massa efficitur. Sed volutpat augue sit amet risus aliquet auctor. Fusce eu dui ac lacus euismod tincidunt id quis tellus.</p>
            </div>
            <div class="image-placeholder">Image</div>
        </div>
    `;
}

async function communityPageBetolt() {
    
}

window.addEventListener("load", function() {
    //jatekAdatBetolt();
})