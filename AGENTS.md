<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Launch date, game URL, X link and token links live in `src/config/site.ts`; edit there only so every button/countdown stays in sync.
- Launch-list emails are insert-only for visitors (no read policy) so submitted emails are never exposed publicly.
- Immersive scenes share WorldScene for scroll and pointer camera movement; disable camera motion when reduced motion is requested to keep exploration accessible.
