import { test, expect } from 'vitest';
import { parseSubscriptions } from '../components/HtmlSubscriptionImporter.jsx';

const sampleHtml = `
<ytd-channel-renderer>
  <ytd-channel-name>
    <yt-formatted-string id="text">Channel One</yt-formatted-string>
  </ytd-channel-name>
  <a class="channel-link" href="/@one"></a>
</ytd-channel-renderer>
<ytd-channel-renderer>
  <ytd-channel-name>
    <yt-formatted-string id="text">Channel Two</yt-formatted-string>
  </ytd-channel-name>
  <a class="channel-link" href="https://www.youtube.com/@two"></a>
</ytd-channel-renderer>`;

test('parseSubscriptions extracts channel names and urls', () => {
  expect(parseSubscriptions(sampleHtml)).toEqual([
    { name: 'Channel One', url: 'https://www.youtube.com/@one' },
    { name: 'Channel Two', url: 'https://www.youtube.com/@two' },
  ]);
});

test('parseSubscriptions skips items missing name or url', () => {
  const html = `
  <ytd-channel-renderer>
    <ytd-channel-name></ytd-channel-name>
    <a class="channel-link" href="/@x"></a>
  </ytd-channel-renderer>
  <ytd-channel-renderer>
    <ytd-channel-name>
      <yt-formatted-string id="text">Valid</yt-formatted-string>
    </ytd-channel-name>
    <a class="channel-link" href="/@valid"></a>
  </ytd-channel-renderer>`;
  expect(parseSubscriptions(html)).toEqual([
    { name: 'Valid', url: 'https://www.youtube.com/@valid' },
  ]);
});

test('parseSubscriptions returns empty array when no channels found', () => {
  expect(parseSubscriptions('<div></div>')).toEqual([]);
});
