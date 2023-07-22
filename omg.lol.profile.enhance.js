let recent_lfm = document.getElementById('recent_lfm');
let url = 'https://lfm.byemc.xyz/byeemc'

let updateStatus = _ => {

    let spinning = document.getElementById('spinning');

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data = data.recenttracks.track

        let icons = [
            "<i class=\"fa-solid fa-fw fa-solid fa-spin fa-compact-disc\"></i>", // Playing
            "<i class=\"fa-solid fa-fw fa-solid fa-xmark\"></i>", // Paused
        ]

        let current = document.createElement('a');
        current.classList.add('current');

        // first item in the list is the current track
        let currentTrack = data[0];
        let currentTrackName = `${currentTrack.name}`;
        let currentTrackArtist = currentTrack.artist['#text'];
        let currentTrackImage = currentTrack.image[3]['#text'];
        let isNowPlaying = currentTrack['@attr'] && currentTrack['@attr'].nowplaying;

        if (!isNowPlaying) {
            spinning.innerHTML = icons[1] + ' Not currently scrobbling';
            return;
        }

        current.href = currentTrack.url;

        current.innerHTML = currentTrackName + ' — ' + currentTrackArtist;
        
        spinning.innerHTML = icons[0] + ' ' + currentTrackName + ' — ' + currentTrackArtist;
    })
}

let updateTracks = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data = data.recenttracks.track

        // clear the div
        recent_lfm.innerHTML = '';

        let current = document.createElement('a');
        current.classList.add('current');

        // first item in the list is the current track
        let currentTrack = data[0];
        let currentTrackName = `<i class="fa-fw fa-solid fa-play"></i> ${currentTrack.name}`;
        let currentTrackArtist = currentTrack.artist['#text'];
        let currentTrackImage = currentTrack.image[3]['#text'];

        current.href = currentTrack.url;

        current.innerHTML = `<img src="${currentTrackImage}" alt=""><div class="text"><h4>${currentTrackName}</h4><p>${currentTrackArtist}</p></div>`;

        recent_lfm.appendChild(current);

        // rest of the list is the recent tracks, which share are added to a div, but do have their own divs

        let recent = document.createElement('div');
        recent.classList.add('recent');

        for (let i = 1; i < data.length; i++) {
            let track = data[i];
            let trackName = track.name;
            let trackArtist = track.artist['#text'];
            let trackImage = track.image[3]['#text'];

            let trackDiv = document.createElement('a');
            trackDiv.classList.add('track');
            trackDiv.href = track.url;

            trackDiv.innerHTML = `<img src="${trackImage}" alt=""><h4>${trackName}</h4><p>${trackArtist}</p>`;

            recent.appendChild(trackDiv);
        }

        recent_lfm.appendChild(recent);
    })
}